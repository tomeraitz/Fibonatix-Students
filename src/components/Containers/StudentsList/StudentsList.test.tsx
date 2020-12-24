import {shallow} from 'enzyme';
import { expect } from 'chai';
import StudentsList from './StudentsList';

describe('StudentsList component', () => {
    const wrapper = shallow(<StudentsList    
        students={[]}
        deleteStudents={null}
        startIndex={0}
        endIndex={8}
        moveToNext={null}
        moveToBack={null}
        editStudent={null}/>);
    test('should check all',async () => {
        await wrapper.instance().onChecked(-1)
        expect(wrapper.state().checkedAll).equal(true);
    });
    test('should update student object by key and value',async () => {
        await wrapper.instance().updateStudent('Age', 100)
        expect(wrapper.state().studentInput.age).equal(100);
    });
  });