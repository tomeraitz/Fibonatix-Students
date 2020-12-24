import {shallow} from 'enzyme';
import { expect } from 'chai';
import App from './App';


describe('App component', () => {
  const wrapper = shallow(<App />);
  test('should delete by id',async () => {
    await wrapper.instance().componentDidMount();
    const students = wrapper.state().students;
    const randomStudent = students[Math.floor(Math.random() * students.length)];
    await wrapper.instance().deleteStudents([randomStudent.id],true);
    expect(wrapper.state().students.find(obj=>obj.id===randomStudent.id)).equal(undefined);
  });

  test('should edit student',async () => {
    const students = wrapper.state().students;
    const randomStudent = students[Math.floor(Math.random() * students.length)];
    await wrapper.instance().editStudent(randomStudent.id, [{name : "Special name"}],null,true);
    expect(wrapper.state().students.find(obj=>obj.id===randomStudent.id).name).equal("Special name");
  })
});