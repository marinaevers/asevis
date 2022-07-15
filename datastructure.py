import numpy as np
import os

class Series():
    beta = 0
    d = 0.0
    times = None
    orientations = None
    phase = 0.0
    T = None
    TOverTime = None
    
    def __init__(self, beta, d, times, orientations):
        self.beta = beta
        self.d = d
        self.times = times
        self.orientations = orientations
        self.phase = d*beta

class Data():
    series = []
    particleNumber = 0
    minTime = 10000
    maxTime = 0
    selectedIdx = 0
    selectedParticleIndex = 0
    selection = [0]
    color = "beta"
    theta = 90
    phi = 0
    angleX = "phi"
    component = "T_z"
    particleChoice = "inner"
    selectedTimes = [0, 100]
    nameMeasurePerTimestep = None
    codeMeasurePerTimestep = None
    nameAggregatedMeasure = None
    codeAggregatedMeasure = None
    selectionEnsemble = [0, 1]
    timeRange = (0,1)
    colorTimeplotBy = "beta"
    minD = 10
    maxD = 0
    minBeta = 0
    maxBeta = -10
    fontSize = 16


def getPosition(d):
    h = 10
    L = d#2*d
    a = L * 0.86602540378
    positions = np.array([[h/2.0-1.0/2.0*L, h/2.0+a, h/2.0],[h/2.0+1.0/2.0*L, h/2.0+a, h/2.0],
    [h/2.0-L, h/2.0, h/2.0],[h/2.0, h/2.0, h/2.0],[h/2.0+L, h/2.0, h/2.0],
    [h/2.0-1.0/2.0*L, h/2.0-a, h/2.0],[h/2.0+1.0/2.0*L, h/2.0-a, h/2.0]])
    return positions

def addData(T_map, i, phi, theta, dataString, particleNumber):
    # Prepare data
    data = np.array(dataString.split()).astype(float).reshape(particleNumber,3)
    # Add to map
    if(theta in T_map[i]):
        T_map[i][theta][phi] = data
    else:
        T_map[i][theta] = { phi : data }
    return T_map

def loadMap(particleNumber, prefix):
    first = True
    T_map = [dict() for x in range(particleNumber)]
    for i in range(particleNumber):
        T_map[i] = {}
    for i in range(particleNumber):
        try:
            f = open(prefix + "/torqueMap"+str(i)+".dat", "r")
        except:
            print("File for torque not found")
            print(prefix + "/torqueMap"+str(i)+".dat")
            return None
        lines = list(f)
        if(len(lines)==0):
            continue
        dataString = ""
        theta = 0
        phi = 0
        for line in lines:
            if(line[0] != " "):
                #Treat previous empty, if available
                if(first):
                    first = False
                else:
                    T_map = addData(T_map, i, phi, theta, dataString[:-1], particleNumber)
                theta = int(line.split()[0])
                phi = int(line.split()[1])
                dataString = line.split(maxsplit = 2)[2][2:-2]
            else:
                dataString = dataString + " " + line[2:-2]
        T_map = addData(T_map, i, phi, theta, dataString[:-1], particleNumber)
        f.close()
        first = True
    return T_map
    
def loadData():
    #PATH = "/home/m_ever14/Desktop/Debug/"
    #PATH = "/home/marina/Desktop/Debug"
    #PATH = "/media/m_ever14/Elements/DataPRX/NewCalculations"
    PATH = "/media/m_ever14/Seagate Backup Plus Drive/DataPRX/NewCalculations"
    #PATH = "/media/m_ever14/Elements/DataPRX/"
    #PATH = "/media/marina/Elements/DataPRX/"
    #PATH = "/home/marina/Desktop/DataPRX/"
    #PATH = "/media/marina/Elements/DataPRX/ForVisShortPaper"
    NUM = 7
    data = Data()
    data.particleNumber = NUM
    stepsize = 5
    for run in sorted(os.listdir(PATH)):
        runPath = os.path.join(PATH, run)
        # run format: bb.b-d.ddd
        offset = 0
        if(run[-4] != '.'):
            offset = 1
        beta = float(run[:-6-offset])
        d = float(run[-5-offset:])*2
        times = (np.loadtxt(os.path.join(runPath, "times.txt"))/10**2)[::stepsize]
        orientations = np.zeros((NUM, len(times), 3))
        print("Load: " + str(beta) + ", " + str(d))
        for i in range(NUM):
            orientations[i] = np.loadtxt(os.path.join(runPath, "orientation"+str(i)+".txt"))[::stepsize]
        series = Series(beta, d, times, orientations)
        data.series.append(series)
        data.minTime = min(times[0], data.minTime)
        data.maxTime = max(times[-1], data.maxTime)
        data.minD = min(data.minD, d)
        data.maxD = max(data.maxD, d)
        data.minBeta = min(data.minBeta, beta)
        data.maxBeta = max(data.maxBeta, beta)
    return data
