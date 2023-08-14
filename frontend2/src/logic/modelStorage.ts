export function saveModel(model: object, defaultName = "model") {
  if (!model) {
    return;
  }
  let name = `${defaultName}_0`;
  for (let i = 0; localStorage.getItem(name); i++) {
    name = `${defaultName}_${i}`;
  }
  localStorage.setItem(name, JSON.stringify(model));
  return name;
}

export function loadModels(defaultName = "model") {
  const models = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(defaultName)) {
      models.push({
        name: key,
        model: JSON.parse(localStorage.getItem(key)!),
      });
    }
  }
  return models;
}
