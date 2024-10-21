import IncorrectRequestError from "../errors/IncorrectRequestError.js";


const paginateAndOrdenate =  async (req, res, next)=> {
    try {
        let { limit = 3, page = 1, ordenate = "_id:-1" } = req.query;

        let [ fieldOrdenate, order ] = ordenate.split(":");

        limit = parseInt(limit);
        page = parseInt(page);

        const result = res.result;

        if(limit > 0 && page > 0){

            const dataPaginated = await result.find().sort({[fieldOrdenate]: order}).skip((page - 1)*limit).limit(limit).exec();

            res.status(200).json(
                {
                    datas: dataPaginated,
                    quantity: dataPaginated.length,
                },
            );
        }
        else
            next(new IncorrectRequestError());
    } catch (error) {
        next(error);
    }
};

export default paginateAndOrdenate;