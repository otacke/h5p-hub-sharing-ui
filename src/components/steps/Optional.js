import React from 'react';
import PropTypes from 'prop-types';
import Keywords from '../generic/keywords/Keywords';
import FormElement from '../generic/form/Element';
import TranslationContext from '../../context/Translation';

const Optional = ({ optionalInfo, setOptionalInfo }) => {

  const l10n = React.useContext(TranslationContext);

  /**
   * Updates chips in optionalInfo
   * @param  {string[]} chips
   */
  const setChips = (chips) => {
    setOptionalInfo(() => ({
      ...optionalInfo,
      keywords: chips
    }));
  }

  return (
    <>
      <FormElement label={l10n.keywords}>
        <Keywords chips={optionalInfo.keywords} setChips={setChips}></Keywords>
      </FormElement>
    </>
  );
};

Optional.propTypes = {
  optionalInfo: PropTypes.object.isRequired,
  setOptionalInfo: PropTypes.func.isRequired
}

export default Optional;