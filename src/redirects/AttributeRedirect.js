import * as PIXI from 'pixi.js';
import { Redirect } from './Redirect';

/**
 * An attribute-redirect describes how the batch renderer will
 * aggregate shader attributes.
 */
export class AttributeRedirect extends Redirect
{
    constructor(source, glslIdentifier,
        type = 'float32', size = 0,
        glType = PIXI.TYPES.FLOAT, glSize,
        normalize = false)
    {
        super(source, glslIdentifier);

        /**
         * View on the source buffer that should be used to
         * extract data.
         *
         * @member {string}
         * @see {PIXI.ViewableBuffer#view}
         */
        this.type = type;

        /**
         * Number of elements to extract out of `source` with
         * the given view type, for one vertex.
         *
         * @member {number}
         */
        this.size = size;

        /**
         * Type of attribute, when uploading.
         *
         * Normally, you would use the corresponding type for
         * the view on source. However, to speed up uploads
         * you can aggregate attribute values in larger data
         * types. For example, an RGBA vec4 (byte-sized channels)
         * can be represented as one `Uint32`, while having
         * a `glType` of `UNSIGNED_BYTE`.
         *
         * @member {PIXI.TYPES}
         */
        this.glType = glType;

        /**
         * Size of attribute in terms of `glType`.
         *
         * Note that `glSize * glType <= size * type`
         *
         * @readonly
         */
        this.glSize = glSize;

        /**
         * Whether to normalize the attribute values.
         *
         * @member {boolean}
         * @readonly
         */
        this.normalize = normalize;
    }

    static vertexSizeFor(attributeRedirects)
    {
        return attributeRedirects.reduce(
            (acc, redirect) =>
                (PIXI.ViewableBuffer.sizeOf(redirect.type) *
                    redirect.size) + acc);
    }
}