import type { Component } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useForm } from '../utils/validation.jsx';
import './ContactForm.scss';

export const ContactForm: Component = () => {
  /**
   * Util function to encode data for netify forms
   * @param data
   * @private
   */
  function _encode(data): string {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      )
      .join('&');
  }

  function _successMessage() {
    this.flashSuccess("Thanks for contacting us! We'll be in touch shortly.");
    this.$ga.event({
      eventLabel: 'contact-form-submitted'
    });
  }

  function _errorMessage() {
    this.flashError('Something went wrong :(. Please refresh and try again.');
  }

  const sendContactRequest = async function () {
    if (this.formValid) {
      const token = await this.$recaptcha.execute('submit');

      const data = { 'g-recaptcha-response': token, ...this.$data };
      return fetch('https://shipshape.io/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: _encode({ 'form-name': 'contact-us', ...data })
      })
        .then(_successMessage.bind(this))
        .catch(_errorMessage.bind(this));
    }
  };

  const { validate, formSubmit, errors } = useForm({
    errorClass: 'error-input'
  });

  const ErrorMessage = (props) => <span class="error-message">{props.error}</span>;

  return (
    <div class="relative w-full">
      <div class="pt-12 lg:grid lg:grid-cols-2 lg:gap-x-64 lg:pb-64">
        <div class="w-full">
          <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Get your product in <span class="italic">ship shape</span> with
            support from our trusted software consultants
          </h2>
          <p class="mt-4 text-lg sm:mt-3">
            As a full-stack development team, our goal is to be the last
            software consultant you ever need to hire. From custom app
            development, to mentoring and training, we’re here to tackle your
            next tech challenge. Reach out to share your goals and learn how we
            can help you reach them.
          </p>
        </div>

        <div class="w-full">
          <form
            class="contact-form grid grid-cols-1 gap-y-6 -mt-6 lg:grid-cols-2 lg:gap-x-6"
            data-netlify-recaptcha="true"
            name="contact-us"
            netlify-honeypot="bot-field"
            netlify
            use:formSubmit={sendContactRequest}
          >
            <div class="lg:col-span-2">
              <input type="hidden" name="form-name" value="contact-us" />
              <fieldset>
                {/* <div class="error-message">
                  {errors.map((error) => (
                    <p>{error}</p>
                  ))}
                </div> */}

                <div class="bot-field">
                  <label>
                    Don’t fill this out if you're human:
                    <input name="bot-field" />
                  </label>
                </div>
              </fieldset>
            </div>

            <div>
              <label for="name" class="block text-sm font-bold text-navy">
                Name
              </label>
              <div class="mt-1">
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  class="block w-full shadow-sm sm:text-sm focus:outline-none focus:ring-navy-card-light focus:border-navy-card-light border-grey-light rounded-md"
                  use:validate
                />
              </div>

              {errors.name && <ErrorMessage error={errors.name} />}
            </div>

            <div>
              <label for="email" class="block text-sm font-bold text-navy">
                Email
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autocomplete="email"
                  class="block w-full shadow-sm sm:text-sm focus:outline-none focus:ring-navy-card-light focus:border-navy-card-light border-grey-light rounded-md"
                  use:validate
                />
              </div>

              {errors.email && <ErrorMessage error={errors.email} />}
            </div>

            <div>
              <label for="company" class="block text-sm font-bold text-navy">
                Company
              </label>
              <div class="mt-1">
                <input
                  id="company"
                  type="text"
                  name="company"
                  autocomplete="organization"
                  class="block w-full shadow-sm sm:text-sm focus:outline-none focus:ring-navy-card-light focus:border-navy-card-light border-grey-light rounded-md"
                />
              </div>
            </div>

            <div>
              <label for="budget" class="block text-sm font-bold text-navy">
                Expected Budget
              </label>
              <select
                id="budget"
                name="budget"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-grey-light focus:outline-none focus:ring-navy-card-light sm:text-sm rounded-md"
              >
                <option value="25k-50k">$25,000 – $50,000</option>
                <option value="50k-100k">$50,000 – $100,000</option>
                <option value="100k-250k">$100,000 – $250,000</option>
                <option value="over_250k">$250,000+</option>
              </select>
            </div>
            <div class="lg:col-span-2">
              <div class="flex justify-between">
                <label
                  class="block text-sm font-bold text-navy"
                  for="description"
                >
                  How can we help you?
                </label>
              </div>
              <div class="mt-1">
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  class="block w-full shadow-sm sm:text-sm focus:ring-navy-card-light focus:border-navy-card-light border-grey-light rounded-md"
                  use:validate
                ></textarea>
              </div>

              {errors.description && <ErrorMessage error={errors.description} />}
            </div>

            <input
              disabled={Object.keys(errors).length}
              type="submit"
              value="Send Message"
              class="btn btn-red cursor-pointer inline-flex justify-center border border-transparent transition-colors font-medium rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            />

            <div class="text-xs">
              This site is protected by reCAPTCHA and the Google
              <a href="https://policies.google.com/privacy">Privacy Policy</a>
              and
              <a href="https://policies.google.com/terms">Terms of Service</a>
              apply.
            </div>
          </form>
          <flash-message class="flex flex-grow mt-8" />
        </div>
      </div>
    </div>
  );
};
