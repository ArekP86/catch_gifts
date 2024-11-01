// Gifts array
let gifts = [];



(async () => {
    // App init
    const app = new PIXI.Application();
    await app.init({ background: '#ffffff', resizeTo: window });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    // App parameters
    const movementState = {
        moveLeft: 0,
        moveRight: 0
    };

    // Game parameters
    const basketSpeed = app.screen.width / 80;
    const giftFallSpeed = 10;

    // Assets
    const bluePadTexture = await PIXI.Assets.load('assets/blue_pad.png');
    const basket = new PIXI.Sprite(bluePadTexture);
    basket.width = 225;
    basket.height = 75;
    basket.position.set(app.screen.width / 2 - basket.width / 2, app.screen.height - basket.height * 2);
    app.stage.addChild(basket);

    class Gift {
        constructor(texture) {
            this.sprite = new PIXI.Sprite(texture);
            this.sprite.width = 40;
            this.sprite.height = 40;
            this.sprite.radius = 20;
            this.sprite.anchor.set(0.5, 0.5);
            app.stage.addChild(this.sprite);
            gifts.push(this);
        }

        fallDawn(delta) {
            console.log('fallDawn');
            this.sprite.y = this.sprite.y - giftFallSpeed * delta;
        }
    }

    const gift1Texture = await PIXI.Assets.load('assets/ball.png');
    for (let i = 0; i < 15; i++) {
        console.log(i);
        let randomX = app.screen.width / 2 + getRandomInt(-(app.screen.width / 3), (app.screen.width / 3) + 1);
        let gift = new Gift(gift1Texture, randomX);
    }


    // Controls input handling
    window.addEventListener("keyup", keyUpHandler);
    window.addEventListener("keydown", keyDownHandler);

    function keyUpHandler(event) {
        if (event.key == "ArrowLeft" || event.key == 'a' || event.key == 'A') {
            movementState.moveLeft = 0;
        }
        if (event.key == "ArrowRight" || event.key == 'd' || event.key == 'D') {
            movementState.moveRight = 0;
        }
    }

    function keyDownHandler(event) {
        if (event.key == "ArrowLeft" || event.key == 'a' || event.key == 'A') {
            movementState.moveLeft = 1;
        }
        if (event.key == "ArrowRight" || event.key == 'd' || event.key == 'D') {
            movementState.moveRight = 1;
        }
    }

    // TICKER LOOP
    app.ticker.add((time) => {
        const delta = time.deltaTime;

        // Move basket
        if (movementState.moveLeft > movementState.moveRight) {
            // console.log("left>right");
            basket.x = basket.x - basketSpeed;
        } else if (movementState.moveLeft < movementState.moveRight) {
            basket.x = basket.x + basketSpeed * delta;
            // console.log("left>right");
        }

        // Basket movement constraints
        if (basket.x < 0) {
            basket.x = 0;
        }
        if (basket.x > app.screen.width - basket.width) {
            basket.x = app.screen.width - basket.width;
        }

        // Move gifts
        for (let i = 0; i < gifts.length; i++) {
            gifts[i].fallDawn(delta);
        }

        // Draw
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw basket
        // ctx.fillRect(basketXpos - 20, canvas.height - 20, 40, 10);

        // // Rysowanie obiektów
        // for (let i = 0; i < objects.length; i++) {
        //     let obj = objects[i];
        //     obj.y += 5;
        //     ctx.fillRect(obj.x, obj.y, 20, 20);
        // }

        // // Sprawdzenie kolizji (prosty przykład)
        // for (let i = 0; i < objects.length; i++) {
        //     let obj = objects[i];
        //     if (obj.y > canvas.height - 20 && obj.x > basketXpos - 20 && obj.x < basketXpos + 20) {
        //         // Obiekt został złapany
        //         objects.splice(i, 1);
        //         // Zwiększ punktację (nie zaimplementowane)
        //     }
        // }

    });

    // UTILS
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

})();