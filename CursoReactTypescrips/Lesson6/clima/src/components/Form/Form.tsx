import { countries } from '../../data/countries';
import styles from "./Form.module.css";
import { useState} from 'react';
import type { ChangeEvent } from 'react';
import type { SearchType } from '../../types';

export default function Form () {
  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: ''
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <form className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="city">Ciudad:</label>
          <input
            id="city"
            type="text"
            name="city"
            placeholder="Ciudad"
            className={styles.input}
            value={search.city}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="country">País:</label>
          <select
            id="country"
            name="country"
            className={styles.select}
            value={search.country}
            onChange={handleChange} // ← corregido
          >
            <option value="">--Seleccione un País--</option>
            {countries.map(country => (
              <option
                key={country.code}
                value={country.code}
              >
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <input type="submit" value="Buscar Clima" className={styles.submit} />
      </form>
    </div>
  );
}
