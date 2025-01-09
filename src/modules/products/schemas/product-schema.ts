import * as zod from 'zod';

const createProductSchema = zod.object({
    name: zod.string().nonempty('Product name is required'),

});