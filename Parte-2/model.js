let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );
let bookmarksL = mongoose.model('bookmarks', Schema ({
    id: uuid.v4(),
    titulo: String,
    descripcion: String,
    url: String
}));

mongoose.Promise = global.Promise;

/* Tu código va aquí */
let bookmarkList = {
    update: function (id, mod) {
        if (title)
            bookmarksL.findOneAndUpdate(id, mod, { new: true })
                .then(response => {
                    return response;
                })
                .catch(err => {
                    throw Error(err);
                });
    }
};

module.exports = {
    bookmarkList  
};