import { MessageService } from './message.service';

describe( 'MessageService' ,() => {
    let service:MessageService;

    beforeEach(() => {
        service = new MessageService();
    })

    it(" should have no messages to start",()=> {
        expect(service.messages.length).toEqual(0);
    })

    it(" should add a message when add is called",()=> {
        service.messages.push('message1');
        expect(service.messages.length).toEqual(1);
    })
    
    

    it(" should remove all message when clear is called",()=> {
        service.clear()
        expect(service.messages.length).toEqual(0);
    })


});