import {CompositeDecorator} from 'draft-js'
import LinkDecorator from './LinkDecorator'
import ImageDecorator from './ImageDecorator'
//import VideoDecorator from './VideoDecorator'
import {Entity} from 'draft-js'

export const RICH_DECORATOR = new CompositeDecorator([{
    strategy: findLinkEntities,
    component: LinkDecorator
}, {
    strategy: findImageEntities,
    component: ImageDecorator
}
]);

function findLinkEntities(contentBlock, callback) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                Entity.get(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}
function findImageEntities(contentBlock, callback) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                Entity.get(entityKey).getType() === 'PHOTO'
            );
        },
        callback
    );
}

// function findVideoEntities(contentBlock, callback) {
//     contentBlock.findEntityRanges(
//         (character) => {
//             const entityKey = character.getEntity();
//             return (
//                 entityKey !== null &&
//                 Entity.get(entityKey).getType() === 'VIDEO'
//             );
//         },
//         callback
//     );
// }