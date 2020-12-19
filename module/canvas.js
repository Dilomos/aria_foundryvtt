
/* -------------------------------------------- */

/**
 * Hijack Token health bar rendering to include temporary and temp-max health in the bar display
 * TODO: This should probably be replaced with a formal Token class extension
 */
const _TokenGetBarAttribute = Token.prototype.getBarAttribute;
export const getBarAttribute = function(...args) {
  const data = _TokenGetBarAttribute.bind(this)(...args);
  if ( data && (data.attribute === "attributes.hp") ) {
    data.value = parseInt((getProperty(this.actor.data, "data.attributes.hp.max") - getProperty(this.actor.data, "data.attributes.hp.bonus") ) || 0);
    data.max = parseInt(getProperty(this.actor.data, "data.attributes.hp.max") || 0);

    if(data.value < 0)
        data.value = 0;
  }
  return data;
};