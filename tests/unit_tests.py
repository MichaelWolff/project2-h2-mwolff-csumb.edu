import unittest
import sys
sys.path.append('../')
import app
import Translate

class testTranslate(unittest.TestCase):
    def testTranslate(self):
        result = Translate.translate_text('de', 'good day')
        self.assertEquals(result, 'guten tag')

class testparseWithAlfred(unittest.TestCase):
    def testTestingtest(self):
        result = app.testTesting('This is some test text')
        self.assertEquals(result, 'This is some test text')
        
    def testParseAbout(self):
        result = app.parseMessage('!!about')
        self.assertEquals(result, 'This is a batman themed chat app built for CST 438 Project 2, this is the fifth attempt')
    
    def testParseBatsy(self):
        result = app.parseMessage('!!Batsy')
        self.assertEquals(result, 'NahNahNah Bataman!!')
    
    def testParseJoker(self):
        result = app.parseMessage('!!Joker')
        self.assertEquals(result, "How many software engineers does it take to change a lightbult? -- None, that's a hardware problem")
    
    def testParseHelp(self):
        result = app.parseMessage('!!help')
        self.assertEquals(result, "!!say <something> - I'll say something || !!about - Page Description !!Batsy - ...bat stuff !!Joker - I got jokes")

    #def testParseMessage(self):
     #   result = app.parseMessage('>>')
      #  self.assertEquals(result, 'This is a batman themed chat app built for CST 438 Project 2, this is the fifth attempt')
    
    
    def testTesting(self):
        result = ' '
        self.assertEquals(result, ' ')

if __name__ == '__main__':
    unittest.main()
