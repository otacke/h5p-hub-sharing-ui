import React, { useContext } from 'react';
import TranslationContext from '../../../context/Translation';
import MetadataContext from '../../../context/Metadata';
import Chips from '../chips/Chips';
import PropTypes from 'prop-types';

import SearchFilter from '../selector/SearchFilter/SearchFilter';

const DisciplineSelector = ({ disciplines, setDisciplines }) => {

  const metadata = useContext(MetadataContext);
  const l10n = useContext(TranslationContext);
  const [inputFocus, setInputFocus] = React.useState(false);

  /**
   * @param  {string} filter
   * @param  {string || string[]} checked- checkboxes to be turned on or of
   * @param  {boolean} checkedOf
   */
  const handleChecked = (filter, checked, checkedOf) => {
    if (Array.isArray(checked) && checked !== null) {
      const tempDisciplines = checkedOf ?
        disciplines.filter(element => checked.indexOf(element) === -1).concat(checked)
        : disciplines.filter(id => checked.indexOf(id) === -1);
      setDisciplines(tempDisciplines);
    }
    else if (checked != null) {
      const tempDisciplines = checkedOf ? [...disciplines, checked] : disciplines.filter(id => id !== checked);
      setDisciplines(tempDisciplines);
    }
  }

  /**
   * Return chips with name and id
   */
  const getChips = () => {
    return disciplines.map(discipline => {return {id: discipline, name: metadata.getDiscipline(discipline).name}});
  }

  /**
   * Set chips and focus if last
   * @param  {string[]} chips - chips ids
   */
  const setChips = (chips) => {
    setDisciplines(chips);
    if(chips.length === 0){
      setInputFocus((prev) =>
        !prev
      )
    }
  }

  return (
    <>
      <Chips
        chips={getChips()}
        setChips={setChips}
        />
      <SearchFilter
        items={metadata.disciplines}
        handleChecked={handleChecked}
        checked={disciplines}
        filter='discipline'
        dictionary={l10n.discipline}
        category={true}
        dropdownAlwaysOpen={false}
        setFocus={inputFocus}/>
    </>
  );
};

DisciplineSelector.propTypes = {
  disciplines: PropTypes.array.isRequired,
  setDisciplines: PropTypes.func.isRequired
};

export default DisciplineSelector;