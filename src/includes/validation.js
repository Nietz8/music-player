import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from 'vee-validate';
import {
  required, min, max, alpha_spaces as alphaSpaces, email,
  min_value as minValue, max_value as maxValue, confirmed,
  not_one_of as excluded,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('min_value', minValue);
    defineRule('max_value', maxValue);
    defineRule('password_mismatch', confirmed);
    defineRule('excluded', excluded);
    defineRule('country_excluded', excluded);

    configure({
      generateMessage: (ctxt) => {
        const messages = {
          required: `The field ${ctxt.field} is required.`,
          min: `The field ${ctxt.field} is too short.`,
          man: `The field ${ctxt.field} is too long.`,
          alpha_spaces: `The field ${ctxt.field} may only alphabetical characters ans spaces.`,
          email: `The field ${ctxt.field} must be a valid email.`,
          min_value: `The filed ${ctxt.field} is too low.`,
          max_value: `The filed ${ctxt.field} is too high.`,
          excluded: `You are not allowed to use this value for the field ${ctxt.field}.`,
          country_excluded: 'Due to restrictions, we do not accept users from this location.',
          password_mismatch: 'The passwords don\'t match.',
          tos: 'You must accept the Terms of Service.',
        };
        const message = messages[ctxt.rule.name]
          ? messages[ctxt.rule.name]
          : `The field ${ctxt.field} is invalid.`;
        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
