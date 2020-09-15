const database = require("../config/database")
const Product = {}

Product.GetAll = () => {
    return new Promise((resolve, reject) => {
        database
            .query("SELECT * FROM public.produk ORDER BY id ASC ")
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

Product.Add = (datas) => {
    console.log(datas)
    database
        .query(`INSERT INTO public.produk (name, stok, price, images, image_tittle, target, category) VALUES ('${datas.name}', ${datas.stok}, ${datas.price}, '${datas.images}', '${datas.image_tittle}', '${datas.target}', '${datas.category}')`)
        .then((res) => {
            console.log(res)
            return "Data berhasil di tambah"
        })
        .catch((err) => {
            console.log(err)
            return err
        })
}

Product.Edit = (id, name, stok, price, images) => {
    database
        .query(`UPDATE public.produk SET name='${name}', stok=${stok}, price='${price}', images='${images}' WHERE id=${id};`)
        .then((res) => {
            console.log(res)
            return "Data berhasil di update"
        })
        .catch((err) => {
            console.log(err)
            return err
        })
}

Product.Delete = (name) => {
    database
        .query(
            `DELETE FROM public.produk WHERE name='${name}';`)
        .then((res) => {
            console.log(res)
            return "Data berhasil di hapus"
        })
        .catch((err) => {
            console.log(err)
            return err
        })
}

Product.search = (name) => {
    return new Promise((resolve, reject) => {    
        database
        .query(
            `SELECT * FROM public.produk WHERE lower(name) LIKE lower('%${name}%') `)
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

Product.sort = (sort) => {
    return new Promise((resolve, reject) => {    
        database
        .query(
            `SELECT * FROM public.produk ORDER BY ${sort} ASC`)
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}
module.exports = Product