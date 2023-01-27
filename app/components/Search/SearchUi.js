import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { NavLink } from 'react-router-dom';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import suggestionsApi from 'dan-api/ui/menu';
import useStyles from './search-jss';

const menu = [];

function renderInput(inputProps) {
  const { ref, ...rest } = inputProps;

  return (
    <TextField
      variant="standard"
      className="input-header"
      fullWidth
      InputProps={{
        inputRef: ref,
        ...rest,
      }} />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem selected={isHighlighted} component={NavLink} to={suggestion.link}>
      <div>
        {parts.map((part, index) => (
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 700 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )
        ))}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps}>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;
  return inputLength === 0 ? [] : menu.filter(suggestion => {
    const keep = (!inputValue || suggestion.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) && count < 5;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

function SearchUi(props) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { classes } = useStyles();

  useEffect(() => {
    suggestionsApi.map(item => {
      if (item.child) {
        item.child.map(itemChild => {
          if (itemChild.link) {
            menu.push(itemChild);
          }
          return menu;
        });
      }
      return false;
    });
  }, []);

  const handleSuggestionsFetchRequested = (e) => {
    setSuggestions(getSuggestions(e.value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const handleSuggestionSelected = (event, { suggestion, method }) => {
    const { history } = props;
    if (method === 'enter') {
      history.push(suggestion.link);
    }
  };

  return (
    <Autosuggest
      theme={{
        container: classes.containerSearch,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion,
      }}
      renderInputComponent={renderInput}
      suggestions={suggestions}
      onSuggestionsFetchRequested={(e) => handleSuggestionsFetchRequested(e)}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      renderSuggestionsContainer={renderSuggestionsContainer}
      getSuggestionValue={getSuggestionValue}
      onSuggestionSelected={handleSuggestionSelected}
      renderSuggestion={renderSuggestion}
      className={classes.autocomplete}
      inputProps={{
        placeholder: 'Search UI',
        value,
        onChange: handleChange,
      }}
    />
  );
}

SearchUi.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SearchUi;
