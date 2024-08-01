class Radio {
  constructor(props) {
    this.name = props.name;
    this.validateCallback = props.validateCallback;
    this.disabled = props?.disabled ?? false;
    this.readonly = props?.readonly ?? false;
    this.required = props?.required ?? false;
  }

  async validate() {
    if (this.value === this.oldValue) return this.invalid;

    this.oldValue = this.value;

    const valid = await this.validateCallback(this.value);

    return (this.invalid = !valid);
  }

  static factory(props) {
    return new Radio(props);
  }
}

export { Radio };
