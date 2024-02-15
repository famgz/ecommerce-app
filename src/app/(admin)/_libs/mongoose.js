import mongoose from 'mongoose';

export async function mongooseConnect() {
  const uri = process.env.MONGODB_URI;

  /*
  Connection ready state:
    0 = disconnected
    1 = connected
    2 = connecting
    3 = disconnecting
    99 = uninitialized
  */

  // already connected
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise()
  }

  return mongoose.connect(uri)

}
