import { PREFIX } from '../../constants';

const generateAlignmentAttributes = ({ controlName }) => {
    return {
        [`${PREFIX}${controlName}Aligns`]: {
            type: 'object',
            default: {
                desk: '',
                tab: '',
                mob: ''
            }
        }
    };
};

export default generateAlignmentAttributes;
