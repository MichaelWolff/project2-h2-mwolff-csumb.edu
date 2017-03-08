import unittest

class StringSplitTestCase(unittest.TestCase):
    def test_split_two_words(self):
        result = 'bat man'.split()
        self.assertEquals(len(result), 2)
        self.assertEquals(result[0], 'bat')
        self.assertEquals(result[1], 'man')
if __name__ == '__main__':
    unittest.main()
