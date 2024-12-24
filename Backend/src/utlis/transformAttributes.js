const transformAttributes = (body) => {
    const attributes = [];
    const names = body['attribute[][name]'];
    const values = body['attribute[][value]'];

    // Handle both single value and array scenarios
    const namesArray = Array.isArray(names) ? names : [names];
    const valuesArray = Array.isArray(values) ? values : [values];

    // Combine names and values into objects
    for (let i = 0; i < namesArray.length; i++) {
        attributes.push({ name: namesArray[i], value: valuesArray[i] });
    }

    return attributes;
};
export { transformAttributes };
