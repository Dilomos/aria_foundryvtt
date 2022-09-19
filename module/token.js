/**
 * Extend the base TokenDocument class to implement system-specific HP bar logic.
 * @extends {TokenDocument}
 */
 export class AriaTokenDocument extends TokenDocument {

  getBarAttribute(...args) {
    const data = super.getBarAttribute(...args);
    if ( data && (data.attribute === "attributes.hp") ) {
      const hpMax = this.actor.system.attributes.hp.max || 10;
      const hpBonus = this.actor.system.attributes.hp.bonus || 0;

      data.value = ( (hpMax - hpBonus ) || 0);
      data.max = (hpMax || 0);


      if(data.value < 0)
          data.value = 0;
    }
    return data;
  }
}
