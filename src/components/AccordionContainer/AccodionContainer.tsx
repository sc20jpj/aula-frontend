import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp,faAngleDown } from '@fortawesome/free-solid-svg-icons';
import styles from '@components/AccordionContainer/AccordionContainer.module.scss';

interface AccordionContainerProps {
    title: string;
    children: React.ReactNode;
}

function AccordionContainer(props: AccordionContainerProps) {
    const { title, children } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.accordionContainer}>
            <div className={styles.accordionHeader} onClick={toggleAccordion}>
                <span>{title}</span>
                {isOpen ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} /> }
            </div>
            {isOpen && (
                <div className={styles.accordionContent}>
                    {children}
                </div>
            )}
        </div>
    );
}

export default AccordionContainer;
