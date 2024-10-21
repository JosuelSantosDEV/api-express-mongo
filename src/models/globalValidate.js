import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  validator: function (valor) {
    return valor.trim() !== "";
  },
  message: ({ path }) => `The ${path} field was provided blank`,
});
