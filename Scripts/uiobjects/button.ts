module UIObjects
{
    export class Button extends Core.GameObject
    {
        // PRIVATE FIELDS (CLASS MEMBERS)

        // PUBLIC PROPERTIES

        // CONSTRUCTOR(S)

        constructor(bitmap_asset: string, x: number = 0, y: number = 0, isCentered: boolean = false)
        {
            super(bitmap_asset, x, y, isCentered)

            this.isCentered = isCentered;

            // mouse events
            this.on("mouseover", this.m_mouseOver);
    
            this.on("mouseout", this.m_mouseOut);
        }

        private m_mouseOver(): void
        {
            this.alpha = 0.7; // 70% opaque
        }

        private m_mouseOut(): void
        {
            this.alpha = 1.0; // 100% opaque
        }

        // PUBLIC METHOD(S)
        public greyButton(isGrey: boolean): void
        {
            if(isGrey)
            {
                this.filters = [ new createjs.ColorFilter(0.6, 0.6,0.6,1,1,1,-255,0)];
                this.cache(0, 0, 67, 67);
                this.mouseEnabled = false;
            }
            else
            {
                this.filters = null;
                this.cache = null;
                this.mouseEnabled = true;
            }
            
        }
    }
}