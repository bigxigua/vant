import { createNamespace } from '../utils';
import Network from './Network';

const [createComponent, bem] = createNamespace('empty');

const PRESETS = ['error', 'search', 'default'];

export default createComponent({
  props: {
    description: String,
    image: {
      type: String,
      default: 'default',
    },
  },

  methods: {
    genImageContent() {
      const slots = this.$slots.image?.();

      if (slots) {
        return slots;
      }

      if (this.image === 'network') {
        return <Network />;
      }

      let { image } = this;

      if (PRESETS.indexOf(image) !== -1) {
        image = `https://img.yzcdn.cn/vant/empty-image-${image}.png`;
      }

      return <img src={image} />;
    },

    genImage() {
      return <div class={bem('image')}>{this.genImageContent()}</div>;
    },

    genDescription() {
      const description = this.$slots.description
        ? this.slot.description()
        : this.description;

      if (description) {
        return <p class={bem('description')}>{description}</p>;
      }
    },

    genBottom() {
      const slot = this.$slots.default?.();

      if (slot) {
        return <div class={bem('bottom')}>{slot}</div>;
      }
    },
  },

  render() {
    return (
      <div class={bem()}>
        {this.genImage()}
        {this.genDescription()}
        {this.genBottom()}
      </div>
    );
  },
});
