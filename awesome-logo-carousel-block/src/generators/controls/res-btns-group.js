import { PREFIX } from '../../constants';

const generateResBtnAttributes = ({
    controlName,
    defaults = {
        desk: '',
        tab: '',
        mob: ''
    }
}) => {
    return {
        [`${PREFIX}${controlName}Desk`]: {
            type: 'string',
            default: defaults.desk
        },
        [`${PREFIX}${controlName}Tab`]: {
            type: 'string',
            default: defaults.tab
        },
        [`${PREFIX}${controlName}Mob`]: {
            type: 'string',
            default: defaults.mob
        }
    };
};
export default generateResBtnAttributes;
