import { Entity } from './Entity';
import { ClassType } from '../Types';

/**
 * The base class for a node.
 *
 * <p>A node is a set of different components that are required by a system.
 * A system can request a collection of nodes from the engine. Subsequently the Engine object creates
 * a node for every entity that has all of the components in the node class and adds these nodes
 * to the list obtained by the system. The engine keeps the list up to date as entities are added
 * to and removed from the engine and as the components on entities change.</p>
 */
export class Node<TNode>
{
    /**
     * The entity whose components are included in the node.
     */
    public entity!:Entity;

    /**
     * Used by the NodeList class. The previous node in a node list.
     */
    public previous:TNode | null = null;

    /**
     * Used by the NodeList class. The next node in a node list.
     */
    public next:TNode | null = null;
}

export function keep( type:ClassType<any> ):Function
{
    return ( target:Object, propertyKey:string, descriptor:TypedPropertyDescriptor<any> ) => {
        let ctor = target.constructor;
        let map:Object;
        let ashProp:string = '__ash_types__';
        if( ctor.hasOwnProperty( ashProp ) )
        {
            map = (<any>ctor)[ ashProp ];
        }
        else
        {
            map = {};
            Object.defineProperty( ctor, ashProp, {
                enumerable: true,
                value: map
            } );
        }

        (<any>map)[ propertyKey ] = type;

        return descriptor;
    };
}
