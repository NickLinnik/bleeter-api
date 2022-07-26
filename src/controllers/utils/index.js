function getInvalidFields(obj, fieldSet) {
  const invalidFields = []
  Object.keys(obj).forEach((key) => {
    if (!fieldSet.includes(key)) invalidFields.push(key)
  })
  return invalidFields;
}

export {getInvalidFields};