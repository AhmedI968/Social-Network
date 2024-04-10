import styles from './search.module.css'
import { MdSearch } from 'react-icons/md';

const Search = ({ placeholder }: { placeholder: string }) => {
    return (
        <div className={styles.container}>
            <MdSearch />
            <input type="text" placeholder={placeholder} className={styles.input} />
            Search</div>

    )
}

export default Search;