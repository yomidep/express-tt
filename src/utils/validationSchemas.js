const createUseradValidationschema = {
    name: {
        isLength: {
            options: {
                min: 5,
                max: 32
            },
            errorMessage: 
                "Must be at least 5 char"
        },
        notEmpty: {
            errorMessage:
                "Cannot be empty"
        },
        isString: {
            errorMessage: "Must be a string"
        }
    }
}

module.exports = createUseradValidationschema