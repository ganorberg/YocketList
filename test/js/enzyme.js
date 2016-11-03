import React from 'react'
import { shallow, mount, render } from 'enzyme';
import chai from 'chai';
import { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon'

import Layout from '../../client/layout';
import Home from '../../client/components/Home';
import Queue from '../../client/components/Queue';
import QueueApp from '../../client/components/Queueapp';
import QueueForm from '../../client/components/Queueform';
import QueueList from '../../client/components/Queuelist';
import RouteNotFound from '../../client/components/RouteNotFound'

chai.use(chaiEnzyme());
const spy = sinon.spy();
let wrapper;

describe('React unit tests', () => {
  describe('<Layout />', () => {
    it('Should exist', () => {
      wrapper = shallow(<Layout />)
      expect(wrapper).to.exist;
    });
  });
  
  describe('<Home />', () => {
    before(() => wrapper = shallow(<Home />));

    it('Should render <div> with id "home"', () => {
      expect(wrapper).to.have.tagName('div');
      expect(wrapper).to.have.id('home');
    });

    it('Should render two forms', () => {
      expect(wrapper).to.have.exactly(2).descendants('form');
    });

    it('Should have a button with text "Create room"', () => {
      expect(wrapper.find('#create-room')).to.have.text('Create room');
    });

    it('Should have a button with text "Join room"', () => {
      expect(wrapper.find('#join-room')).to.have.text('Join room');
    });
  });

  describe('<Queue />', () => {
    before(() => wrapper = shallow(<Queue link="https://www.youtube.com/watch?v=psGrFW69l8Q" />));

    it('Should render <div>', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('Simulates click events on double click', () => {
      wrapper = shallow(<Queue thumbnailClick={spy} key={'https://www.youtube.com/watch?v=yk0kMOKmp50'} 
        link={'https://www.youtube.com/watch?v=yk0kMOKmp50'} score={1} />);
      const img = wrapper.find('img');
      img.simulate('click');
      expect(spy.calledOnce).to.equal(false);
      img.simulate('doubleclick');
      expect(spy.calledOnce).to.equal(true);
    });
  });

  describe('<QueueApp />', () => {
    it('Calls componentDidMount', () => {
      sinon.spy(QueueApp.prototype, 'componentDidMount');
      wrapper = mount(<QueueApp params={{ roomName: 'room1' }} />);
      expect(QueueApp.prototype.componentDidMount.calledOnce).to.equal(true);
    });
    
    it('Should have state "queues" with value deeply equivalent to []', () => {
      wrapper = mount(<QueueApp params={{ roomName: 'room1' }} />);
      expect(wrapper).to.have.state('queues').deep.equal([]);
    });

    it('Should render <div>', () => {
      wrapper = mount(<QueueApp params={{ roomName: 'room1' }} />);
      expect(wrapper).to.have.tagName('div');
    });

    it('Allows us to set props', () => {
      wrapper = mount(<QueueApp params={{ roomName: 'room1' }} />);
      expect(wrapper.props().params).to.deep.equal({ roomName: 'room1' });
      wrapper.setProps({ params: "foo" });
      expect(wrapper.props().params).to.equal("foo");
    });
  });

  describe('<QueueForm />', () => {
    before(() => wrapper = shallow(<QueueForm />));

    it('Should render <form> with name "addLink"', () => {
      expect(wrapper.type()).to.equal('form');
      expect(wrapper).to.have.attr('name').equal('addLink')
    });

    it('Should render one input field', () => {
      expect(wrapper).to.have.exactly(1).descendants('input');
    });

    it('Should have input with id "link" and name "link"', () => {
      expect(wrapper.find('#link')).to.have.attr('name').equal('link');
    });
  });

  describe('<QueueList />', () => {
    before(() => wrapper = shallow(<QueueList queues={['https://www.youtube.com/watch?v=yk0kMOKmp50']} />));

    it('Should render <div> with id "queueDiv"', () => {
      expect(wrapper.type()).to.equal('div');
      expect(wrapper).to.have.id('queueDiv');
    });

    // Error: cannot read property "split" of undefined
    // it('Should pass queues property to Queue component', () => {
    //   const queue = wrapper.find(Queue);
    //   const queues = wrapper.instance().queues;
    //   expect(queue.prop('queues')).to.deep.equal(['https://www.youtube.com/watch?v=yk0kMOKmp50'])
    // });
  });

  describe('<RouteNotFound />', () => {
    before(() => wrapper = shallow(<RouteNotFound />));

   it('Should render <h1>', () => {
      expect(wrapper.type()).to.equal('h1');
    });
  });
});