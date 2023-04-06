const Class = {
  from: (body) => createClass(undefined, body),
  extend: (prototype) => ClassExtend(prototype),
  Null: Symbol('Class.Null'),
  Undefined: Symbol('Class.Undefined'),
};

const createClass = (in_prototype, in_body) => {
  const prototype = in_prototype ?? Object.prototype;
  const s = Object.getPrototypeOf;
  const p = getSetValueOf(Symbol('Class.private'));
  const body = typeof in_body === 'function'
    ? createClassBody(in_body, s, p)
    : in_body;

  const ClassBody = Object.create(prototype, {
    ...Object.getOwnPropertyDescriptors(body),
    ...Object.getOwnPropertyDescriptors({
      new (...args) {
        const instance = Object.create(ClassBody);
        const result = body.init.apply(instance, args);
        switch (result) {
          case Class.Null : return null;
          case Class.Undefined : return undefined;
          default : return result ?? instance;
        }
      },
    }),
  });

  return ClassBody;
}

const ClassExtend = (prototype) => ({
  from: (body) => createClass(prototype, body),
});

const getSetValueOf = (key) => (instance) => {
  if (!(key in instance)) {
    instance[key] = {};
  }
  return instance[key];
}

const createClassBody = (in_body, s, p) => {
  if (typeof in_body === 'function') {
    return in_body({ s, p });
  } else {
    return in_body;
  }
}

module.exports = { Class };
