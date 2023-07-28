class SendToUserError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SendError';
    this.status = 200;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

function CatchError(e, res) {
  if (e instanceof SendToUserError) {
    console.log('Send Error', e.message, 'status ------>', e.status);
    return res.status(e.status).send({error: e.message});
  } else if (e instanceof ValidationError) {
    console.log('Validation Error', e.message, 'status ------->', e.status);
    return res.status(e.status).send({error: e.message});
    
  } else {
    console.log('Other Error', e.message, 'status ------>', e.status || 500);
    return res.status(e.status || 500).send({error: "Something went wrong"});
  }
}

module.exports = {SendToUserError, ValidationError, CatchError};