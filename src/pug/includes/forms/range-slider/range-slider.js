export default class RangeSlider {
  constructor(sliderContainer, sizes) {
    this.container = sliderContainer;
    this.sliders = {
      first: sliderContainer.querySelector('.range-slider__input'),
      second: sliderContainer.querySelector('.range-slider__input-2'),
    };
    this.range = sliderContainer.querySelector('.range-slider__range');
    this.numRange = {
      lower: sliderContainer.querySelector('.range-slider__from'),
      higher: sliderContainer.querySelector('.range-slider__to'),
    };
    this.sizes = sizes;
    this.changeRange();
    this.container.addEventListener('input', (evt) => {
      if (evt.target.classList.contains('range-slider__input')) {
        this.changeRange();
      }
    });
  }

  static spacify(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  changeRange() {
    const { first, second } = this.sliders;
    const lower = Number(first.value) > Number(second.value) ? second : first;
    const lowerValue = Number(lower.value);
    const higher = Number(first.value) > Number(second.value) ? first : second;
    const higherValue = Number(higher.value);
    const { track, thumb } = this.sizes;
    const leftRatio = lowerValue / (lower.max - lower.min);
    const widthRatio = Math.abs(lowerValue - higherValue) / (lower.max - lower.min);
    this.range.style.left = `${(leftRatio * track.width) + track.borderWidth}rem`;
    this.range.style.width = `${(track.width - thumb.width / 2) * widthRatio}rem`;
    this.numRange.lower.textContent = RangeSlider.spacify(lowerValue);
    this.numRange.higher.textContent = RangeSlider.spacify(higherValue);
  }
}
