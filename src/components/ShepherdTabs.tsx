import { createSignal, Switch, Match } from 'solid-js';
import type { Component } from 'solid-js';
import './Tabs.scss';

// TODO: refactor to get abstraction as suggested https://github.com/solidjs/solid/issues/222
export const ShepherdTabs: Component = () => {
  const [activeTab, setActiveTab] = createSignal(0);
  const updateTab = (index) => setActiveTab(index);

  return (
    <div class="tabs">
      <nav>
        <ul class="block lg:inline-flex">
          <li class={`w-full ${activeTab() === 0 ? 'tab-current' : ''}`}>
            <a onClick={() => updateTab(0)}>
              <span>{'Accessibility'}</span>
            </a>
          </li>
          <li class={`w-full ${activeTab() === 1 ? 'tab-current' : ''}`}>
            <a onClick={() => updateTab(1)}>
              <span>{'Highly Customizable'}</span>
            </a>
          </li>
          <li class={`w-full ${activeTab() === 2 ? 'tab-current' : ''}`}>
            <a role="tab" onClick={() => updateTab(2)}>
              <span>{'Framework Ready'}</span>
            </a>
          </li>
        </ul>
      </nav>

      <div class="content-wrap">
        <div class="max-w-3xl">
          <Switch>
            <Match when={activeTab() === 0}>
              <p>
                Shepherd has full keyboard navigation support, focus trapping,
                and a11y compliance via aria attributes. This ensures that
                everyone, regardless of abilities, is able to have a great user
                experience when they interact with your product.
              </p>
            </Match>
            <Match when={activeTab() === 1}>
              <p>
                Shepherd's styles are kept minimal, allowing you to easily
                customize the look and feel, but still give you enough to drop
                in and be ready to go quickly. This allows you to have a highly
                stylized, custom site tour experience to match your brand.
              </p>
            </Match>
            <Match when={activeTab() === 2}>
              <p>
                Shepherd is ready to drop into your application using React,
                Ember, Angular, Vue.js, ES Modules, or plain Javascript!
                Integration with any app is a breeze with Shepherd, and your
                developers will appreciate the breadth of options for quickly
                spinning it up.
              </p>
            </Match>
          </Switch>
        </div>
      </div>
    </div>
  );
};
