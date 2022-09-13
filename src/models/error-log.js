import * as admin from 'firebase-admin';

export const create = async params => {
  try {
    const offer = await admin
      .firestore()
      .collection('error-logs')
      .add({
        ...params,
      });
    return offer;
  } catch (e) {
    console.log(e);
    throw {
      message: 'Falha ao criar log',
    };
  }
};
