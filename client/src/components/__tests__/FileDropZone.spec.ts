import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import FileDropZone from '../FileDropZone.vue';

describe('FileDropZone', () => {
  it('renders properly', () => {
    const wrapper = mount(FileDropZone, { props: { msg: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
