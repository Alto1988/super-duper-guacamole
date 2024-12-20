/**@jsx jsx */
import {css, jsx} from '@emotion/react';
import {fontFamily, fontSize, gray1, gray2, gray5} from '../Styles/Styles';
import {ChangeEvent, FC, FormEvent, useState} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';

export const Header: FC = () => {
    const history = useHistory();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const criteria = searchParams.get('criteria') || '';
    const [search, setSearch] = useState(criteria);

    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value);
    };

    const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        history.push(`/search?criteria=${search}`);
    };

    return (
        <div
            css={css`
                position: fixed;
                box-sizing: border-box;
                top: 0;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 20px;
                background-color: #fff;
                border-bottom: 1px solid ${gray5};
                box-shadow: 0 3px 7px 0 rgba(110, 112, 114, 0.21);
            `}
        >
            <Link
                to=".."
                css={css`
                    font-size: 24px;
                    font-weight: bold;
                    color: ${gray1};
                    text-decoration: none;
                `}
            >
                Q & A
            </Link>
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearchInputChange}
                    css={css`
                        box-sizing: border-box;
                        font-family: ${fontFamily};
                        font-size: ${fontSize};
                        padding: 8px 12px;
                        border: 1px solid ${gray5};
                        border-radius: 3px;
                        color: ${gray2};
                        background-color: white;
                        width: 200px;
                        height: 30px;

                        :focus {
                            outline-color: ${gray5};
                        }
                    `}
                />
            </form>
            <Link
                to="./signin"
                css={css`
                    font-family: ${fontFamily};
                    font-size: ${fontSize};
                    padding: 5px 10px;
                    background-color: transparent;
                    color: ${gray2};
                    text-decoration: none;
                    cursor: pointer;

                    span {
                        margin-left: 10px;
                    }

                    :focus {
                        outline-color: ${gray5};
                    }
                `}
            >
                <span>Sign In</span>
            </Link>
        </div>
    );
};