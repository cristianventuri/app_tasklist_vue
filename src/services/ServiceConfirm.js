import app from '../main';

export function confirm(titulo, message, fnShow, fnHide) {
  app.config.globalProperties.$confirm.require({
    header: titulo,
    message: message,
    onShow: fnShow,
    onHide: fnHide
  });
};
