class BaseError extends Error {
    constructor (message = "Internal error server", status= 500) {
        super();
        this.message = message;
        this.status = status;
    };

    sendResponse(res){
        res.status(this.status).send({
            mensagen: this.message,
            status: this.status
        });
    }

};

export default BaseError;