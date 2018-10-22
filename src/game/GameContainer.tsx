import * as React from 'react';
import {EventType, IBomb, ICharacter, ICharacterInfo, ICoordinate, IGameMap, IGameState, ITile, TileType } from './game.typings';
import GameBoardContainer from './GameBoardContainer';
import ScoreBoardContainer from './scoreboard/ScoreBoardContainer';

interface IState {
    tiles: Map<string, ITile>
    currentCharacters: Map<string, ICharacter>
    previousCharacters: Map<string, ICharacter>
    bombs: IBomb[],
}

const colours = ['#4286f4', '#d3422c', '#88d852', '#f0fc0c', '#c774f2']
const WINDOW_WIDTH = window.innerWidth // Tile size is adapted to size of window when app is loaded
// const EMPTY_TILE_COLOUR = '#eff2f7';
const OBSTACLE_TILE_COLOUR = '#041126';


export default class GameContainer extends React.Component<any, IState> {
    public map: IGameMap;
    public tiles = new Map<string, ITile>();
    public currentCharacters = new Map<string, ICharacter>();
    public previousCharacters = new Map<string, ICharacter>();
    public bombs: IBomb[] = [];
    public ws: WebSocket = new WebSocket('ws://localhost:8999');

    public render() {
        const TILE_SIZE = this.map? WINDOW_WIDTH / this.map.width / 1.7 : 0;
        return this.state && this.state.tiles 
        ?   
            <div>
                <h1>XYZ-BOT</h1>
                <div className='container'>
                    <ScoreBoardContainer players={this.state.currentCharacters} />
                    <GameBoardContainer
                        tiles={this.state.tiles} 
                        characters={this.state.currentCharacters} 
                        previousCharacters={this.state.previousCharacters} 
                        bombs={this.state.bombs} 
                        width={this.map.width} 
                        height={this.map.height} 
                        tileWidth={TILE_SIZE} 
                        tileHeight={TILE_SIZE}
                    /> 
                </div>
            </div>
        :
            null;
    }

    public componentDidMount() {
        this.ws.onmessage = (evt: MessageEvent) => this.onUpdateFromServer(evt);
    }

    public componentWillUnmount() {
        this.endGame();
    }

    private onUpdateFromServer(evt: MessageEvent) {
        const gameState = JSON.parse(evt.data) as unknown as IGameState;
        if(gameState.type === EventType.MAP_UPDATE_EVENT) {
            this.updateMap(gameState);
        }
        if(gameState.type === EventType.GAME_ENDED_EVENT) {
            this.endGame();
        }
    }

    private updateMap(gameState: IGameState) {
        this.map = gameState.map;
        // this.addEmptyTiles(this.map.width, this.map.height);
        this.addObstacleTiles(this.map.obstaclePositions);
        // Save the previous characters and their positions to enable animation from previous position to next
        this.previousCharacters = new Map(this.currentCharacters);
        this.addCharacters(this.map.characterInfos);
        this.addColouredTilesForPlayers(this.map.characterInfos);
        this.addBombs(this.map.bombPositions);
        this.setState({ 
            tiles: this.tiles, 
            currentCharacters: this.currentCharacters, 
            previousCharacters: this.previousCharacters, 
            bombs: this.bombs, 
        });
    }

    private endGame() {
        this.tiles.clear();
        this.currentCharacters.clear();
        this.previousCharacters.clear();
        this.map = {} as IGameMap;
        this.bombs = [];
        this.ws.close();
        
    }

    private addColouredTilesForPlayers(characterInfos: ICharacterInfo []) {
        characterInfos.forEach(c => { 
            this.addColouredTilesForPlayer(c.colouredPositions, c.id);
        });
    }

    private addColouredTilesForPlayer(colouredPositions: number[], playerId: string): void {
        colouredPositions.forEach(colouredPosition => {
            const colouredTile = {} as ITile;
            colouredTile.coordinate = this.getCoordinateFromMapPosition(colouredPosition)
            colouredTile.type = TileType.COLOURED;
            const player = this.currentCharacters.get(playerId);
            colouredTile.colour = player ? player.colour: 'white';

            this.tiles.set(JSON.stringify(colouredTile.coordinate), colouredTile);
        });
    }

    private addBombs(bombPositions: number[]) {
        bombPositions.forEach(bombPosition => {
            const bomb = {} as IBomb
            bomb.coordinate = this.getCoordinateFromMapPosition(bombPosition);
            bomb.image = '/images/bomb.png'

            this.bombs.push(bomb);
        });
    }

    private addObstacleTiles(obstaclePositions: number[]) {
        obstaclePositions.forEach(bombPosition => {
            const obstacleTile = {} as ITile
            obstacleTile.coordinate = this.getCoordinateFromMapPosition(bombPosition);
            obstacleTile.type = TileType.OBSTACLE;
            obstacleTile.colour = OBSTACLE_TILE_COLOUR;

            this.tiles.set(JSON.stringify(obstacleTile.coordinate), obstacleTile);
        });
    }

    private addCharacters(characterInfos: ICharacterInfo[]): void {
        characterInfos.forEach((characterInfo, index) => {
            const character = {
                colour: colours[index],
                id: characterInfo.id,
                name: characterInfo.name,
                points: characterInfo.points,
                coordinate: this.getCoordinateFromMapPosition(characterInfo.position)
            }
            this.currentCharacters.set(character.id, character);
        });
    }

    private getCoordinateFromMapPosition(position: number): ICoordinate {
        const yPosition = Math.floor(position / this.map.width);
        const xPosition = position - (yPosition * this.map.width);
        return { x: xPosition, y: yPosition } as ICoordinate;
    } 
}