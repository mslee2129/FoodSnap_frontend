import React from 'react';
import PropTypes from 'prop-types';

function Button({children }) {
    // const outlineClass = outline
    //     ? 'text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
    //     : '';

    return (
        <button>
            {children}
        </button>
    );
}


Button.propTypes = {
    children: PropTypes.node.isRequired,
};

Button.defaultProps = {
    type: 'button',
    className: '',
    variant: 'primary',
    size: 'normal',
    pill: false,
    disabled: false,
    onClick: () => {},
};

export default Button;
