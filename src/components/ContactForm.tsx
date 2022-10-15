import type { Component } from 'solid-js';
import toast, { Toaster } from 'solid-toast';
import { useForm } from '../utils/validation.jsx';

export const ContactForm: Component = () => {
  function _successMessage() {
    toast.success("Thanks for contacting us! We'll be in touch shortly.");
  }

  function _errorMessage() {
    toast.error('Something went wrong :(. Please refresh and try again.');
  }

  const sendContactRequest = async function (form) {
    const formData = new FormData(form);

    return fetch('https://shipshape.io/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
      .then(_successMessage)
      .catch(_errorMessage);
  };

  const { validate, formSubmit, errors } = useForm({
    errorClass: 'error-input'
  });

  const ErrorMessage = (props) => (
    <span class="error-message">{props.error}</span>
  );

  return (
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
              class="block w-full shadow-sm sm:text-sm focus:outline-none focus:ring-navy-card-light focus:border-navy-card-light border-grey-light rounded-md"
              id="name"
              type="text"
              name="name"
              required
              use:validate={[]}
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
              autocomplete="email"
              class="block w-full shadow-sm sm:text-sm focus:outline-none focus:ring-navy-card-light focus:border-navy-card-light border-grey-light rounded-md"
              id="email"
              type="email"
              name="email"
              required
              use:validate={[]}
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
            <label class="block text-sm font-bold text-navy" for="description">
              How can we help you?
            </label>
          </div>
          <div class="mt-1">
            <textarea
              class="block w-full shadow-sm sm:text-sm focus:ring-navy-card-light focus:border-navy-card-light border-grey-light rounded-md"
              id="description"
              name="description"
              required
              rows={4}
              use:validate={[]}
            />
          </div>

          {errors.description && <ErrorMessage error={errors.description} />}
        </div>

        <input
          disabled={Object.keys(errors).length}
          type="submit"
          value="Send Message"
          class="btn btn-red cursor-pointer inline-flex justify-center border border-transparent transition-colors font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </form>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000
        }}
      />
    </div>
  );
};
