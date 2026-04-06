import { PREFIX } from '../../constants';

const generateColorsAttributes = ({ controlName }) => {
    return {
        [`${PREFIX}${controlName}Colors`]: {
            type: 'object',
            default: {
                normal: '',
                hover: ''
            }
        }
    };
};

export default generateColorsAttributes;
