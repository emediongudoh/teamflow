let PayStack = require('paystack-node')

const environment = process.env.NODE_ENV

const paystack = new PayStack(process.env.PAYSTACK_API_KEY, environment)

export { paystack }
