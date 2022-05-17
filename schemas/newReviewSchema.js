const Joi = require('joi');

// Pendiente de hacer comprobaciones para idStates, idJobs, idSalaries, start_year, end_year, salary, enviroment, conciliation, oportunities

const newReviewSchema = Joi.object().keys({
    title: Joi.string()
        .required()
        .min(3)
        .max(50)
        .regex(/^[A-Za-z0-9 ÁÉÍÓÚáéíóúÑñ]*$/)
        .error((errors) => {
            console.log(errors[0].code);
            if (errors[0].code === 'any.required') {
                return new Error('La propiedad [title] es requerida');
            } else if (errors[0].code === 'string.pattern.base') {
                return new Error(
                    'La propiedad [title] solo puede contener letras o números'
                );
            } else {
                return new Error(
                    'La propiedad [title] debe tener entre 3 y 50 caracteres'
                );
            }
        }),
    description: Joi.string()
        .required()
        .min(20)
        .max(500)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('La propiedad [description] es requerida');

                default:
                    return new Error(
                        'La propiedad [description] debe tener entre 20 y 500 caracteres'
                    );
            }
        }),
    idStates: Joi.string()
        .required()
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('La propiedad [idStates] es requerida');

                default:
                    return new Error(
                        'Debe seleccionar un [idStates] de entre las opciones'
                    );
            }
        }),
    idJobs: Joi.string()
        .required()
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('La propiedad [idJobs] es requerida');

                default:
                    return new Error(
                        'Debe seleccionar un [idJobs] de entre las opciones'
                    );
            }
        }),
    idSalaries: Joi.string()
        .required()
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('La propiedad [idSalaries] es requerida');

                default:
                    return new Error(
                        'Debe seleccionar un [idSalaries] de entre las opciones'
                    );
            }
        }),
    start_year: Joi.string()
        .required()
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('La propiedad [start_year] es requerida');

                default:
                    return new Error(
                        'Debe seleccionar un [start_year] de entre las opciones'
                    );
            }
        }),
    end_year: Joi.string()
        .required()
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('La propiedad [end_year] es requerida');

                default:
                    return new Error(
                        'Debe seleccionar un [end_year] de entre las opciones'
                    );
            }
        }),
    salary: Joi.string()
        .required()
        .min(1)
        .max(5)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('La propiedad [salary] es requerida');

                default:
                    return new Error(
                        'La propiedad [salary] debe tener un valor entre 1 y 5'
                    );
            }
        }),
    enviroment: Joi.string()
        .required()
        .min(1)
        .max(5)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('La propiedad [enviroment] es requerida');

                default:
                    return new Error(
                        'La propiedad [enviroment] debe tener un valor entre 1 y 5'
                    );
            }
        }),
    conciliation: Joi.string()
        .required()
        .min(1)
        .max(5)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error(
                        'La propiedad [conciliation] es requerida'
                    );

                default:
                    return new Error(
                        'La propiedad [conciliation] debe tener un valor entre 1 y 5'
                    );
            }
        }),
    oportunities: Joi.string()
        .required()
        .min(1)
        .max(5)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error(
                        'La propiedad [oportunities] es requerida'
                    );

                default:
                    return new Error(
                        'La propiedad [oportunities] debe tener un valor entre 1 y 5'
                    );
            }
        }),
});

module.exports = newReviewSchema;
