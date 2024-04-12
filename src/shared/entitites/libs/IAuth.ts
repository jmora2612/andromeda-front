/**
 * @method interface IAuth()
 * @param denomination {string} corresponde con el nombre de la materia compuesta
 * @param description: {string} corresponde con la descripcion
 * @param arraySubjects: {string} corresponde con un array de las materias que están dentro de ella
 * @param languageReport {string} corresponde al tipo de boleta
 * @param createdAt {Date} presenta la fecha de la creacion de la moneda
 * @param isActive {boolean} corresponde con la activacion o desactivacion de la moneda
 */

export interface IRegister {
    _id?: string;
    name: string;
    email:string;
    phone?:string;
    password:string;
  }
  

  export interface ILogin {
    _id?: string;
    email:string;
    password:string;

  }