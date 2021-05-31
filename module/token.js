/**
 * Extend the base TokenDocument class to implement system-specific HP bar logic.
 * @extends {TokenDocument}
 */
 export class AriaTokenDocument extends TokenDocument {

  getBarAttribute(...args) {
    const data = super.getBarAttribute(...args);
    if ( data && (data.attribute === "attributes.hp") ) {
      data.value = parseInt((getProperty(this.actor.data, "data.attributes.hp.max") - getProperty(this.actor.data, "data.attributes.hp.bonus") ) || 0);
      data.max = parseInt(getProperty(this.actor.data, "data.attributes.hp.max") || 0);

      if(data.value < 0)
          data.value = 0;
    }
    return data;
  }
}
