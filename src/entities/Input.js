class Input {
  constructor(props) {
    this.label = props.label;
    this.name = props.name;
    this.validateCallback = props.validateCallback;
    this.mask = props.mask ? props.mask : () => {};
    this.onBeforeInput = props.onBeforeInput ? props.onBeforeInput : () => {};
    this.disabled = props?.disabled ?? false;
    this.readonly = props?.readonly ?? false;
    this.value = props?.value ?? '';
    this.oldValue = props?.oldValue ?? '';
    this.invalid = props?.invalid ?? false;
    this.type = props?.type ?? 'text';
    this.required = props?.required ?? false;
    this.placeholder = props?.placeholder ?? '';
    this.maxlength = props?.maxlength ?? 244;
    this.autocomplete = props?.autocomplete ?? '';
  }

  setValue(value) {
    this.value = value;
  }

  setInvalid(value) {
    this.invalid = value;
  }

  setReadonly(value) {
    this.readonly = value;
  }

  async validate() {
    if (this.value === this.oldValue) return this.invalid;

    this.oldValue = this.value;

    const valid = await this.validateCallback(this.value);

    return (this.invalid = !valid);
  }

  static factory(props) {
    return new Input(props);
  }
}

export { Input };
