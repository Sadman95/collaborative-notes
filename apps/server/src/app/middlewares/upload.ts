import multer from 'multer'
// import fs from 'fs'
import { JwtPayload } from 'jsonwebtoken'
import path from 'path'

// const dir = './Public'

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    let dest = './public'
    if (file.mimetype.includes('image')) {
      if (file.fieldname == 'avatar') dest += '/images/avatars'
      else if (file.fieldname == 'images') dest += '/images/products'
    }

    callback(null, dest)
  },
  filename: function (req, file, callback) {
    const { userId } = req.user as JwtPayload
    callback(
      null,
      '/' +
        `${
          file.fieldname == 'avatar'
            ? userId
            : file.fieldname == 'images' &&
              `${userId}.${path.basename(
                file.originalname,
                path.extname(file.originalname)
              )}`
        }` +
        path.extname(file.originalname)
    )
  },
})

export const upload = multer({
  limits: {
    fileSize: 5242880,
  },
  storage: storage,
})
